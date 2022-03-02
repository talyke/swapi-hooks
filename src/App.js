import React from 'react';
import axios from 'axios';
import './App.css';

function App() {
    let [responseData, setResponseData] = React.useState('');
    const myList = document.querySelector('ul');
    const myRequest = new Request('names.json');
/*    const myReplacedCharactertId = fetchEvent.replacesCharacterId;

    self.addEventListener('fetch', function (event) {
        console.log(event.replacesCharacterId);
    });*/

    const fetchData = React.useCallback(() => {
        axios({
            "method": "GET",
            "url": "https://swapi.dev/api/people/",
            "headers": {
                "content-type": "application/json",
            }, "params": {
                "language_code": "en",
                "results": "[{}]",
            }// FIXME https://swapi.dev/api/people/?language_code=en&results=[%7Bname%7D]
        })
            .then((response) => {
                setResponseData(response.data)
            })
        fetch(myRequest)
            .then(response => response.json())
            .then(data => {
                for (const [id] of data.people) {
                    let people = document.body.childNodes[0];
                    let homeworld = document.body.childNodes[1];
                    let output = document.getElementById("name");
                    let span = document.getElementsByTagName("span")[3];
                    let textnode = span.nextSibling;
                   // textnode.data = homeworld.data
                    output.value = people.data;
                    let listItem = document.createElement('li');
                    listItem.appendChild(
                        document.createElement('strong')
                    ).textContent = `${people.name}`;
                    listItem.append(
                        ` born in homeworld ${people.name}. Name: `
                    );
                    listItem.appendChild(
                        document.createElement('strong')
                    ).textContent = `${homeworld.name}`;
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
                    <output id="name"></output>
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
