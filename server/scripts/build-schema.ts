process.env.BACKEND_ENV = 'dev';
import path from 'path';
import fs from 'fs';
import child_process from 'child_process';

const SCHEMA_LOCATION = path.join(process.cwd(), '..', 'server/schema.gql');

async function startAndStopApplication() {
    if (fs.existsSync(SCHEMA_LOCATION)) {
        fs.unlinkSync(SCHEMA_LOCATION);
    }
    const proc = child_process.spawn('npm', ['run', 'start:dev']);
    setInterval(() => {
        if (fs.existsSync(SCHEMA_LOCATION)) {
            proc.kill();
            process.exit();
        }
    }, 500);
    await new Promise((res) => setTimeout(res, 30000));
    throw new Error('Schema generation failed');
}

startAndStopApplication();
