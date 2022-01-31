import React from 'react';
import axios from 'axios';
import './App.css';

function App() {
    let [responseData, setResponseData] = React.useState('');
    const myList = document.querySelector('ul');
    const myRequest = new Request('names.json');

    const fetchData = React.useCallback(() => {
        axios({
            "method": "GET",
            "url": "https://swapi.dev/api/people/",
            "headers": {
                "content-type": "application/json",
            }, "params": {
                "language_code": "en",
                "results": "[{name}]",
            }
        })
            .then((response) => {
                setResponseData(response.data)
            })
        fetch(myRequest)
            .then(response => response.json())
            .then(data => {
                for (const name of data.names) {
                    let listItem = document.createElement('li');
                    listItem.appendChild(
                        document.createElement('strong')
                    ).textContent = name.Name;
                    listItem.append(
                        ` born in homeworld planet ${name.Name}. Name: `
                    );
                    listItem.appendChild(
                        document.createElement('strong')
                    ).textContent = `${name.planet}`;
                    myList.appendChild(listItem);
                }
            })
            .catch(console.error);
           
    }, [])

    React.useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div className="App">
            <header className="App-header">
                <h1>
                    Fetching Data with React Hooks
                </h1>
                <button type='button' onClick={fetchData}>Click for Data</button>
            </header>
            <main>
                {responseData &&
                    <blockquote>
                        "{responseData && responseData.content}"
                        <small>{responseData && responseData.originator && responseData.originator.name}</small>
                    </blockquote>
                }
            </main>
            {/* <pre>
        <code>
          {responseData && JSON.stringify(responseData, null, 4)}
        </code>
      </pre> */}
        </div>
    );
}

export default App;
