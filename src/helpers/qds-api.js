

const objectToQueryString=(obj)=> Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
   

export const API = {
    query:{
        // https://localhost:5001/api/Query/?query=
        newRequest : (columns)=> new Promise((resolve,reject)=>{
            fetch("/api/Query?"+objectToQueryString(
                {
                    query:columns
                }
            ), { 
                method: 'GET',                     
                headers: new Headers()
            })
            .then((resp) => {       
                if (resp.status >= 200 && resp.status < 300) {         
                    resp.json().then(queryId=>{
                        resolve(queryId)
                    })
                } else {
                    reject(resp)
                }
            })
        }),
        // https://localhost:5001/api/Query/get?id=b3bddd09-d81a-4841-9bd9-bea458639053
        getQuery: (queryId)=> new Promise((resolve,reject)=>{
            console.log("Querying "+queryId);

            fetch("/api/Query/get?"+objectToQueryString({
                id:queryId
            }), { 
                method: 'GET',                     
                headers: new Headers()
            })
            .then((resp) => {          
                if (resp.status >= 200 && resp.status < 300) {                             
                    resp.json().then(query=>{
                        if(!query.plan.completed){
                            console.log("Plan not ready.. waiting 1 second..")
                            setTimeout(()=>{
                                return API.query.getQuery(queryId);
                            },1000);
                        } else {
                            console.log("Query ready",query)
                            resolve(query)
                        }
                    })
                } else {
                    reject(resp)
                }    
            })
        }),        

        // https://localhost:5001/api/Query/All
        getAllQueries:()=> new Promise((resolve,reject)=>{
            fetch("/api/Query/All", { 
                method: 'GET',                     
                headers: new Headers()
            })
            .then((resp) => {                
                if (resp.status >= 200 && resp.status < 300) {         
                    resp.json().then(queries=>{
                        resolve(queries)
                    })
                } else {
                    reject(resp)
                }    
            })
        }),    

        
    }
}