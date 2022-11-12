import React from "react";
import config from "../../../config.json";
import { StyledRegisterVideo } from "./styles";
import { createClient } from '@supabase/supabase-js'

const PROJECT_URL = "https://jugenmkwwwiiwnuzmyio.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1Z2VubWt3d3dpaXdudXpteWlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMDM3MjAsImV4cCI6MTk4Mzc3OTcyMH0.3rOmyQ4hUU1X9N_HWpgAIV4OqIt3ttg5nzEZvZCURK4";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function refreshPage() {
    window.location.reload(false);
}

function useForm(formProps) {
    const [values, setValues] = React.useState(formProps.initialValues);
    return {
        values,
        handleChange: (e) => {
            // console.log(e.target);
            // console.log(name, "=", value);
            const value = e.target.value;
            const name = e.target.name;
            setValues({ ...values, [name]: value })
        },
        clearForm() {
            setValues({ titulo: "", url: "", playlist: "Jogos" })
        }
    }
}

export default function RegisterVideo() {
    const [formVisivel, setFormVisivel] = React.useState(false);
    const playlistNames = config.playlists;
    const formCadastro = useForm({
        initialValues: { titulo: "", url: "", playlist: "Jogos" }
    });
    // console.log("formVisivel =", formVisivel);
    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {formVisivel ? (
                <form onSubmit={(e) => {
                    // console.log(formCadastro.values);
                    e.preventDefault();
                    // Integracao
                    supabase.from("video").insert({
                        title: formCadastro.values.titulo,
                        url: formCadastro.values.url,
                        playlist: formCadastro.values.playlist
                    })
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                    formCadastro.clearForm();
                    refreshPage();
                    setFormVisivel(false);
                }}>
                    <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                            X
                        </button>
                        {formCadastro.values.url && (
                            <div>
                                <h2>{formCadastro.values.titulo}</h2>
                                <div>
                                    <iframe
                                        width="100%"
                                        height="220"
                                        src={`https://www.youtube.com/embed/${getVideoId(formCadastro.values.url)}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        )}
                        <br />
                        <input
                            placeholder="Título do vídeo"
                            name="titulo"
                            value={formCadastro.values.titulo}
                            onChange={formCadastro.handleChange}
                        />
                        <input
                            placeholder="URL (ex.: youtube.com/watch?v=...)"
                            name="url"
                            value={formCadastro.values.url}
                            onChange={formCadastro.handleChange}
                            required
                            pattern="^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$"
                        />
                        <select
                            name="playlist"
                            options={playlistNames}
                            value={formCadastro.values.playlist}
                            onChange={formCadastro.handleChange}
                        >
                            {playlistNames.map((playlistName) => {
                                return (
                                    <option key={playlistName} value={playlistName}>{playlistName}</option>
                                )
                            })}
                        </select>
                        <br />
                        <button type="submit">Adicionar</button>
                    </div>
                </form>
            ) : null}
        </StyledRegisterVideo>
    )
}

function getVideoId(url) {
    var video_id = "";
    if (url.includes(".be/")) video_id = url.split(".be/")[1];
    if (url.includes("/embed/")) video_id = url.split("/embed/")[1];
    if (url.includes("com/v/")) video_id = url.split("com/v/")[1];
    if (url.includes("/watch?v=")) {
        video_id = url.split("/watch?v=")[1];
        let ampersandPosition = video_id.indexOf("&");
        if (ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
    }
    return video_id;
}