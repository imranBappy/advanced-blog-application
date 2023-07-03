import {NextResponse} from 'next/server';
import {verify} from 'jsonwebtoken';

const SECRETE = '123';

export default function middleware(req: any) {
    const jwt = '';
    console.log(req);
    
    const url = req.url;
    if (url.include('/dashboard')) {
        if (jwt === undefined) {
            return NextResponse.redirect('/login');
        }
        try {
            verify(jwt, SECRETE)
            return NextResponse.next()
        } catch (error) {
            console.log(error);
            return NextResponse.redirect('/login');
        }
    }
    return NextResponse.redirect('/login');
    return NextResponse.next()
 }