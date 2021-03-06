import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(
    backend: MockBackend,
    options: BaseRequestOptions) {
    //admin
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkR1bW15IEFkbWluIiwiYWRtaW4iOnRydWV9.WgHAOwVfXkmxJyzdKFvZhma2Ffh4anUfCSyF36LSxJc';
    //Not admin
    //let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkR1bW15IEFkbWluIiwiYWRtaW4iOmZhbHNlfQ.VE6TqiiNdVDRyPjHz4H5vCCn9dwQqCjLbra9XZQA6aw';
    backend.connections.subscribe((connection: MockConnection) => {
        // We are using the setTimeout() function to simulate an 
        // asynchronous call to the server that takes 1 second. 
        setTimeout(() => {
            //
            // Fake implementation of /api/authenticate
            //
            if (connection.request.url.endsWith('/api/authenticate') &&
                connection.request.method === RequestMethod.Post) {
                let body = JSON.parse(connection.request.getBody());

                if (body.email === 'admin@domain.com' && body.password === '1234') {
                    connection.mockRespond(new Response(
                        new ResponseOptions({
                            status: 200,
                            body: { token: token }
                        })));
                } else {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200 })
                    ));
                }
            }



            // 
            // Fake implementation of /api/orders
            //
            if (connection.request.url.endsWith('/api/orders') &&
                connection.request.method === RequestMethod.Get) {
                if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: [1, 2, 3] })
                    ));
                } else {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 401 })
                    ));
                }
            }



        }, 1000);
    });

    return new Http(backend, options);
}

export let fakeBackendProvider = {
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};