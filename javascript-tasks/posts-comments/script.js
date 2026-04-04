let data = []
let comments = []

const getData = async () => {
    let loading = document.getElementById('loading')
    loading.style.display = "block"
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts');
        data = await response.json()
        displayData()
    } catch (err) {
        console.log(err)
    } finally {
        loading.style.display = "none"
    }
}
const displayData = () => {
    let post_wrap = document.getElementById('post-wrap')

    data.slice(0, 10).forEach(item => {
        let div = document.createElement('div')
        div.classList.add('post-container')
        let title = document.createElement('h1')
        title.textContent = item.title

        let body = document.createElement('p')
        body.textContent = item.body


        let comment_button = document.createElement('button')
        comment_button.textContent = '💬 Comments'


        comment_button.onclick = function () {
            let commentShow = div.querySelector('.comments')

            if (commentShow) {
                if (commentShow.style.display === "none") {
                    commentShow.style.display = "block"
                    // comment_button.textContent = "💬 Hide Comments"
                } else {
                    commentShow.style.display = "none"
                    // comment_button.textContent = "💬 View Comments"
                }
            } else {
                getComments(item.id, div, comment_button)
            }

        }

        div.append(title, body, comment_button)
        post_wrap.appendChild(div)
        // view_comments(item.id)
    })

}


const getComments = async (id, parentDiv, comment_button) => {
    try {
        let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        comments = await response.json()

        let comment_wrap = document.createElement('div')
        comment_wrap.classList.add('comments')

        comments.forEach(item => {
            let comment_box = document.createElement('div')
            comment_box.classList.add('comment-box')
            let comment_name = document.createElement('h3')
            comment_name.classList.add('comment-name')
            comment_name.textContent = item.name

            let comment_email = document.createElement('p')
            comment_email.classList.add('comment-email')
            comment_email.textContent = item.email

            let comment_body = document.createElement('p')
            comment_body.textContent = item.body


            comment_box.append(comment_name, comment_email, comment_body)
            comment_wrap.appendChild(comment_box)
        })

        parentDiv.appendChild(comment_wrap)

        // comment_button.textContent = "💬 Hide Comments"



    } catch (err) {
        console.log(err)
    }



}


// const view_comments = () => {
//     console.log("Test")
//     comments.forEach(item => {
//         console.log(item)
//     })
// }




getData()

