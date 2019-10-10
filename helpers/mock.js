class Mock extends Helper {

    async makeMock(url, method, body, statusCode = 200) {
        const page = this.helpers['Puppeteer'].page;
        await page.setRequestInterception(true);
        page.on('request', request => {
            if (request.url().endsWith(url) && request.method() == method) {
                request.respond({
                    status: statusCode,
                    body: JSON.stringify(body)
                });
            }
            else {
                request.continue();
            }
        })
    }

    async makeMockAndReadRequestUrlsAndMethods(url, method, body, statusCode = 200) {
        const page = this.helpers['Puppeteer'].page;
        await page.setRequestInterception(true);
        const requestData = {
            urls:[],
            methods:[]
        };
        page.on('request', request => {
            requestData.urls.push(request.url());
            requestData.methods.push(request.method());
            if (request.url().endsWith(url) && request.method() == method) {
                request.respond({
                    status: statusCode,
                    body: JSON.stringify(body)
                });
            }
            else {
                request.continue();
            }
        });
        return requestData
    }

    async overrideRequestBody(url, method, body) {
        const page = this.helpers['Puppeteer'].page;
        await page.setRequestInterception(true);
        page.on('request', request => {
            if (request.url().endsWith(url) && request.method() == method) {
                const postData = JSON.stringify(body);
                request.continue({postData});
            }
            else {
                request.continue();
            }
        })
    }

    async mockAndOverrideRequestBody(mockObject, overrideObject) {
        const page = this.helpers['Puppeteer'].page;
        await page.setRequestInterception(true);
        page.on('request', request => {
            if (request.url().endsWith(overrideObject.url) && request.method() == overrideObject.method) {
                const postData = JSON.stringify(overrideObject.body);
                request.continue({postData});
            }
            else if (request.url().endsWith(mockObject.url) && request.method() == mockObject.method) {
                request.respond({
                    status: mockObject.statusCode,
                    body: JSON.stringify(mockObject.body)
                });
            }
            else {
                request.continue();
            }
        })
    }

    async getResponse(url, method, responseBody) {
        const page = this.helpers['Puppeteer'].page;
        page.on('response', async (response) => {
            if ((await response.url()).endsWith(url) && response. _request._method === method) {
                responseBody.push(await response.json());
            }
        });
    }

    async getUrlsAndMethodsFromRequest() {
        const page = this.helpers['Puppeteer'].page;
        await page.setRequestInterception(true);
        const requestData = {
            urls:[],
            methods:[]
        };
        page.on('request', request => {
            requestData.urls.push(request.url());
            requestData.methods.push(request.method());
            request.continue();
        });
        return requestData
    }

    async makeMockWithHeaders(url, method, body, headers) {
        const page = this.helpers['Puppeteer'].page;
        await page.setRequestInterception(true);
        page.on('request', async request => {
            if (request.url().endsWith(url) && request.method() == method) {
                request.respond({
                    body: JSON.stringify(body),
                    headers: headers,
                });
            }
            else {
                request.continue();
            }
        })
    }

    async makeMockArr(...rest) {
        for(let i=0; i<rest.length;i++){
            if(Object.keys(rest[i]).length !== 3){
                throw 'Error in mock data '+rest[i];
            }
        }
        const page = this.helpers['Puppeteer'].page;
        await page.setRequestInterception(true);
        page.on('request', request => {
            let flag = true;
            for (let i = 0; i < rest.length; i++){
                if (request.url().endsWith(rest[i].url) && request.method() == rest[i].method) {
                    request.respond({
                        body: JSON.stringify(rest[i].body)
                    });
                    flag = false;
                }
            }
            if(flag){
                request.continue();
            }
        })
    }

    async getResponseByUrl(url, method, responseBody) {
        const page = this.helpers['Puppeteer'].page;
        page.on('request', async request => {
            if (await request.url().endsWith(url) && request.method() == method){
                responseBody.push(await request.postData())
            }
        })
    }

    async getResponseText(url, responseBody) {
        const page = this.helpers['Puppeteer'].page;
        page.on('response', async (response) => {
            if (response.url().endsWith(url)){
                responseBody.push((await response.text()))
            }
        })
    }

    async requestAbortByHost(host) {
        const page = this.helpers['Puppeteer'].page;
        await page.setRequestInterception(true);
        page.on('request', request => {
            if (new URL(request.url()).host === host) {
                request.abort();
            } else {
                request.continue();
            }
        })
    }

    async requestAbortByUrl(url) {
        const page = this.helpers['Puppeteer'].page;
        await page.setRequestInterception(true);
        page.on('request', request => {
            if (request.url().endsWith(url)){
                request.abort();
            } else {
                request.continue();
            }
        })
    }
}

module.exports = Mock;
