import React from "react";
import config from "../config.json";
import Menu from "../src/components/menu";
import { CSSReset } from "../src/components/cssreset";
import { StyledBanner } from "../src/components/banner";
import { StyledHeader } from "../src/components/header";
import { StyledTimeline } from "../src/components/timeline";

export default HomePage;

function HomePage() {
    const [valorFiltro, setValorFiltro] = React.useState("");
    return (
        <>
            <CSSReset />
            <div>
                <Menu valorFiltro={valorFiltro} setValorFiltro={setValorFiltro} />
                <Header />
                <Timeline searchValue={valorFiltro} playlists={config.playlists} />
            </div>
        </>
    );
}

function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
            <section className="user-info">
                <img src={`https://picsum.photos/id/${config.img}/200/200`} />
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>
            </section>
        </StyledHeader>
    );
}

function Timeline({ searchValue, ...props }) {
    // console.log("props no componente: ", props);
    const playlistNameArray = Object.keys(props.playlists);
    return (
        <StyledTimeline>
            {playlistNameArray.map((playlistName) => {
                const videosPlaylist = props.playlists[playlistName];
                // console.log(videoArray);
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videosPlaylist
                                .filter((video) => {
                                    // minusculas
                                    const titleNormalized = video.title.toLowerCase();
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueNormalized);
                                }) // "loop"
                                .map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
                                            <img src={`https://i.ytimg.com/vi/${video.url.substring(32)}/maxresdefault.jpg`} />
                                            <span>{video.title}</span>
                                        </a>
                                    )
                                })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    );
}
