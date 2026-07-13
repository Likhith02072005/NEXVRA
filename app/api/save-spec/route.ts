import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const specDataStr = formData.get('specData') as string;
    const file = formData.get('screenshotFile') as File | null;
    const sectionKey = formData.get('sectionKey') as string;

    if (!specDataStr) {
      return NextResponse.json({ error: 'Missing specData payload' }, { status: 400 });
    }

    const defaultRoot = '/Users/likhith/NEXVRA/agency-website';
    const projectRoot = fs.existsSync(defaultRoot) ? defaultRoot : process.cwd();
    const specJsonPath = path.join(projectRoot, 'website_specification.json');
    const uploadsDir = path.join(projectRoot, 'public', 'spec-uploads');

    // Parse incoming specs
    const updatedSpecData = JSON.parse(specDataStr);

    // Make sure public/spec-uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Save screenshot file if provided
    if (file && sectionKey) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = path.extname(file.name) || '.png';
      const filename = `${sectionKey}${ext}`;
      const filepath = path.join(uploadsDir, filename);

      fs.writeFileSync(filepath, buffer);
      
      const publicPath = `/spec-uploads/${filename}`;
      
      // Update screenshot reference in the JSON structure
      if (sectionKey === 'brandSettings') {
        updatedSpecData.brandSettings.screenshot = publicPath;
      } else if (updatedSpecData.sections[sectionKey]) {
        updatedSpecData.sections[sectionKey].screenshot = publicPath;
      }
    }

    // Write updated configuration to disk
    fs.writeFileSync(specJsonPath, JSON.stringify(updatedSpecData, null, 2), 'utf-8');

    return NextResponse.json({ success: true, specData: updatedSpecData });
  } catch (error: any) {
    console.error('Error saving specs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
