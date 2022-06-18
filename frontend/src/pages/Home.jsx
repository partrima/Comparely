import React, { useState, useEffect } from 'react';
import { getAllPlaylists, token, logout, SPOTIFY_LOGIN_URL } from '../spotify';
import { Button, Paper, Box, Typography, IconButton } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CircularProgress from '@mui/material/CircularProgress';



export default function Home() {
    const [accessToken, setAccessToken] = useState('');
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        if (accessToken) {
            // TODO: Get all user info
            // TODO: Store user info using redux
            const allPlaylistsPromise = getAllPlaylists()
            allPlaylistsPromise.then(e => setPlaylists(e))
        }
    }, [accessToken])

    useEffect(() => {
        if (playlists) {
            console.log(playlists)
        }
    }, [playlists])

    const removeHash = () => {
        window.history.pushState("", document.title, window.location.pathname
            + window.location.search);
    }

    useEffect(() => {
        setAccessToken(token);
        removeHash();
    }, []);

    return (
        <div >
            {!accessToken ?
                <Box
                    display="flex"
                    flexDirection="column"
                    gap="2vh"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                >
                    <Box>

                        <Typography variant="h2" style={{ fontWeight: "400", fontFamily: "Roboto", color: "White" }}>
                            Login to begin
                        </Typography>
                    </Box>
                    <Paper elevation={5}>
                        <Button variant="outlined"
                            href={SPOTIFY_LOGIN_URL}
                            startIcon={<MusicNoteIcon color="success" />}
                            color="success"
                        >
                            Spotify
                        </Button>
                    </Paper>
                </Box>
                :
                <Box
                    minHeight="100vh"
                >
                    <div style={{ flexDirection: "row", display: "flex", justifyContent: "space-between" }}>
                        <p>Logged in</p>
                        <IconButton
                            variant="outlined"
                            onClick={logout}>
                            Logout
                        </IconButton>

                    </div>
                    <div style={{ flexDirection: "column", display: "flex" }}>
                        {
                            playlists && playlists.length !== 0 ?
                                playlists.map((playlist, idx) => <p key={`playlist-${idx}`}>{playlist.name}</p>)
                                :
                                <Box
                                    style={{
                                        marginTop: "40%",
                                        marginLeft: "45%"
                                    }}
                                    color='white'>
                                    <CircularProgress color="inherit" />
                                </Box>
                        }
                    </div>
                </Box>
            }
        </div>
    );
}
