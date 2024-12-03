import style from "./Main.module.css"
import { useState } from "react"
import initialPosts from "../../data/posts.js"
import Card from "../../components/Card/Card.jsx"
import Tags from "../../components/Tags/Tags.jsx"


function Main() {

    //Creo lo stato dei post partendo dai dati iniziali (posts.js)
    const [posts, setPosts] = useState(initialPosts)
    const [title, setTitle] = useState("")

    function submit(event) {
        event.preventDefault()

        const newTitle = title.trim()
        if (newTitle === "") return
        const newPost = {
            id: Date.now(),
            title: newTitle,
            image: undefined,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit animi unde quasi enim non esse ratione voluptas voluptate, officiis veritatis magni blanditiis possimus nobis cum id inventore corporis deserunt hic.",
            tags: [],
            published: true
        }

        setPosts([...posts, newPost])
        setTitle("")
    }

    function change(event) {
        setTitle(event.target.value)
    }

    function deletePost(id) {
        setPosts(posts.filter(post => post.id !== id))
    }


    //Tags senza ripetizioni
    const filteredTags = []
    initialPosts.forEach(post => {
        const postTags = post.tags

        postTags.forEach(tag => {
            if (!filteredTags.includes(tag)) {
                filteredTags.push(tag)
            }
        })
    })


    return (
        <main>
            <section className={style.tags}>
                <div className="container">
                    <Tags tags={filteredTags} />
                </div>
            </section>
            <section className={style.form}>
                <div className="container">
                    <h3>Crea un nuovo post</h3>
                    <form onSubmit={submit}>
                        <input type="text" placeholder="Inserisci il titolo" className={style.input_title} onChange={change} value={title} />
                        <input type="submit" className={style.submit} value="Aggiungi" />
                    </form>
                </div>
            </section>
            <section className={style.cards}>
                <div className="container">
                    <div className="row">
                        {posts.filter(post => post.published === true).map(post => (
                            <div key={post.id} className="col-4">
                                <Card item={post} deleteItem={deletePost} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Main