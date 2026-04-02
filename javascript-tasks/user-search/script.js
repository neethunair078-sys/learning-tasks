let api = 'https://jsonplaceholder.typicode.com/users'

let userData = [];



const getUserData = async () => {
    try {
        let response = await fetch(api);
        userData = await response.json()

        displyUserData(userData)

    } catch (err) {
        console.log(err)
    }

}

getUserData()

const displyUserData = async (data) => {
    let tableBody = document.getElementById('tableData')
    tableBody.innerHTML = ""

    data.forEach(item => {
        if(item.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='3'>No data found</td></tr>"
        }

        let tableRow = `
            <tr>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.address.city}</td>
            </tr>
        `;

        tableBody.innerHTML += tableRow

    })
}



// Search
let searchKey = document.getElementById('table-search')


searchKey.addEventListener('input', function () {
        let searchContent = searchKey.value.toLowerCase()


        let filterData = userData.filter(user =>
            user.name.toLowerCase().includes(searchContent) ||
            user.email.toLowerCase().includes(searchContent) ||
            user.address.city.toLowerCase().includes(searchContent)
        )

        displyUserData(filterData)
    })



