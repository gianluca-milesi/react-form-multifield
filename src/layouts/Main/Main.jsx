import style from "./Main.module.css"
import { useState } from "react"
import initialPosts from "../../data/posts.js"
import Card from "../../components/Card/Card.jsx"
import Tags from "../../components/Tags/Tags.jsx"


const initialFormData = {
    title: "",
    image: undefined,
    content: "",
    tags: "",
    published: true
}
/*
immagine prova copia e incolla: 
https://static.vecteezy.com/system/resources/thumbnails/030/362/244/small/a-small-animal-is-sitting-on-a-branch-ai-generated-free-photo.jpg
*/

function Main() {

    //Creo lo stato dei post partendo dai dati iniziali (posts.js)
    const [posts, setPosts] = useState(initialPosts)
    //Creo lo stato del form partendo dai dati iniziali
    const [formData, setFormData] = useState(initialFormData)


    //onChange
    function handleFormData(event) {
        const key = event.target.name
        const value = event.target.value

        const newFormData = {
            ...formData,
            [key]: value
        }
        setFormData(newFormData)
    }

    //onSubmit
    function submit(event) {
        event.preventDefault()

        const newPost = {
            id: Date.now(),
            ...formData,
            tags: formData.tags.split(",").map(tag => tag.trim())
        }
        setPosts([...posts, newPost])
        setFormData(initialFormData) //resetto il campo form
    }

    //deleteItem
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
                        <input name="title" type="text" placeholder="Inserisci il titolo" className={style.input_title} onChange={handleFormData} value={formData.title} />
                        <input name="tags" type="text" placeholder="Inserisci i tags" className={style.input_title} onChange={handleFormData} value={formData.tags} />
                        <input name="image" type="text" placeholder="Inserisci l'immagine" className={style.input_title} onChange={handleFormData} value={formData.image} />
                        <input name="content" type="text" placeholder="Inserisci la descrizione" className={style.input_title} onChange={handleFormData} value={formData.content} />
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