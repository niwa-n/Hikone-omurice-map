import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { mapObjProps } from "./map.tsx"; 

// Propsとして、OmeletteViewerから渡されるshopオブジェクトを受け取る型を定義
interface CardProps {
    shop: mapObjProps;
}

function Cardcomp({ shop }: CardProps) { 
    return (
        // MUIのCardコンポーネントを使用
        <Card 
            sx={{ 
                maxWidth: 345,
                boxShadow: 3, // デフォルトの影
                transition: 'box-shadow 0.3s, transform 0.3s', // 影と移動にアニメーションを適用
                
                // 💡 ホバー時のスタイル定義
                '&:hover': {
                    boxShadow: 10, // 影を強くする
                    transform: 'translateY(-2px)', // 上に2px浮き上がらせる
                    cursor: 'pointer', // カーソルをポインターに変更
                },
            }}
        >
            <CardMedia
                component="img"
                sx={{ height: 140 }}
                image="./public/buchi_cat_for_dev.jpg"
                title="napping cat"
                alt={"napping cat"}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {shop.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    ❤ {shop.loveLevel} / 5
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                    緯度: {shop.place_x}, 経度: {shop.place_y}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default Cardcomp;