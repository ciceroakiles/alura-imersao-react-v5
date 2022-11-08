import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/cssreset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/timeline";

export default HomePage

function HomePage() {
    return (
        <>
            <CSSReset />
            <div>
                <Menu />
                <Header />
                <Timeline playlists={config.playlists}>
                    Conteudo
                </Timeline>
            </div>
        </>
    );
}

const StyledHeader = styled.div`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        margin-top: 50px;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;
function Header() {
    return (
        <StyledHeader>
            {/* <img src="banner" /> */}
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

function Timeline(props) {
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
                            {videosPlaylist.map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
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
