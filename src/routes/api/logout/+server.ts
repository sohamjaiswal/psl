import Database from "better-sqlite3";

const sessions = new Database('./src/database/sessions.sqlite')
export const GET = async ({ cookies }: {cookies: any}) => {
    const session = cookies.get('session');
    if (!session) {
        return new Response(JSON.stringify({ message: 'No session' }), { status: 401 });
    }
    const user = sessions.prepare(`select * from sessions where session = ?`).get([session]);
    if (!user) {
        return new Response(JSON.stringify({ message: 'No user' }), { status: 401 });
    }
    sessions.prepare(`delete from sessions where session = ?`).run([session]);
    cookies.delete('session');
    return new Response(JSON.stringify({}), { status: 200 });
}