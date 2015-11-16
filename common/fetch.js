
import 'whatwg-fetch';

export default function __fetch() {

  return new Promise((resolve, reject) => {
    self.fetch.apply(self, arguments).then(res => {
      const headers = {
        'Last-Modified': res.headers.get('Last-Modified'),
      };
      if (res.status === 200) {
        res.json().then(data => {
          resolve({
            headers,
            data,
          });
        });
      } else {
        reject(new Error(`[Error] status is ${res.status}`))
      }
    }, err => {
      reject(err);
    });
  });

}
