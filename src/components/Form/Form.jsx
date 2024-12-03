import style from "./Form.module.css"

function Form({ formData, handleFormData, submit }) {

    return (
        <>
            <h3>Crea un nuovo post</h3>
            <form onSubmit={submit}>
                <input name="title" type="text" placeholder="Inserisci il titolo" className={style.input_title} onChange={handleFormData} value={formData.title} />
                <input name="tags" type="text" placeholder="Inserisci i tags" className={style.input_title} onChange={handleFormData} value={formData.tags} />
                <input name="image" type="text" placeholder="Inserisci l'immagine" className={style.input_title} onChange={handleFormData} value={formData.image} />
                <input name="content" type="text" placeholder="Inserisci la descrizione" className={style.input_title} onChange={handleFormData} value={formData.content} />
                <input name="published" type="checkbox" className={style.input_title} onChange={handleFormData} checked={formData.published} />
                <input type="submit" className={style.submit} value="Aggiungi" />
            </form>
        </>
    )
}

export default Form