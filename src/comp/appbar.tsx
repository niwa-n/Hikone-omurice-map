import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';

import AboutDialog from './aboutDialog';

function Appbar() {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openAbout, setOpenAbout] = useState(false);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleOpenAbout = () => {
        setOpenAbout(true);
        handleCloseMenu();
    };

    const handleCloseAbout = () => {
        setOpenAbout(false);
    };

    const handleOpenRepo = () => {
        // 🔗 GitHubリポジトリに飛ばす
        // window.open("https://github.com/YourUserName/YourRepoName", "_blank");
        // window.open("https://www.youtube.com/", "_blank"); // テスト用にYouTubeへ飛ばす
        navigate("/nodata")
        handleCloseMenu();
    };

    return (
        <div>
            <AppBar position="fixed" sx={{ backgroundColor: "#ff7043" }} elevation={4}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        🍳 彦根オムライスマップ
                    </Typography>

                    <IconButton 
                        color="inherit"
                        onClick={handleOpenMenu}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={handleOpenAbout}>ℹ️ このサイトについて</MenuItem>

                        {/* 🔗 リポジトリに飛ぶ処理を追加 */}
                        <MenuItem onClick={handleOpenRepo}>🐙 GitHub リポジトリ</MenuItem>

                    </Menu>
                </Toolbar>
            </AppBar>

            <AboutDialog open={openAbout} onClose={handleCloseAbout} />
        </div>
    );
}

export default Appbar;