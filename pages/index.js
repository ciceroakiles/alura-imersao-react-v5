import React from "react";
import config from "../config.json";
import Menu from "../src/components/menu";
import { CSSReset } from "../src/components/cssreset";
import { StyledBanner } from "../src/components/banner";
import { StyledHeader } from "../src/components/header";
import { StyledTimeline } from "../src/components/timeline";
import { videoService } from "../src/service/videoService";

export default HomePage;

function HomePage() {
    const [valorFiltro, setValorFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState({});

    React.useEffect(() => {
        videoService()
            .getAllVideos()
            .then((dados) => {
                const novasPlaylists = { ...playlists }
                dados.data.forEach((video) => {
                    if (!novasPlaylists[video.playlist]) {
                        novasPlaylists[video.playlist] = []
                    }
                    novasPlaylists[video.playlist].push(video)
                })
                setPlaylists(novasPlaylists)
            })
    }, [])
    // console.log("playlists:", playlists)
    return (
        <>
            <CSSReset />
            <div>
                <Menu valorFiltro={valorFiltro} setValorFiltro={setValorFiltro} />
                <Header />
                <Timeline searchValue={valorFiltro} playlists={playlists} />
            </div>
        </>
    );
}

function Header() {
    const id = getRandomInt(85);
    const headerImg = "https://picsum.photos/id/" + id + "/200/200";
    
    // console.log("img:", id);
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
            <section className="user-info">
                {/* React Hydration Error */}
                <img src={headerImg} suppressHydrationWarning />
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>
            </section>
        </StyledHeader>
    );
}

function Timeline({ searchValue, ...props }) {
    const playlistNames = Object.keys(props.playlists);
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase()
                                const searchValueNormalized = searchValue.toLowerCase()
                                return titleNormalized.includes(searchValueNormalized)
                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={`https://i.ytimg.com/vi/${video.url.substring(32)}/maxresdefault.jpg`} />
                                        <span>
                                            {video.title}
                                        </span>
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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}