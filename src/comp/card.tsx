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
                display: 'flex',
                flexDirection: 'column',
                // 1. 幅を固定
                width: 300, // または maxWidth: 400 で最大幅を設定

                // 2. 高さを固定 (必須)
                height: 350, // 例: 500pxに固定

                // 3. コンテンツがはみ出た場合の処理 (必須)
                overflowY: 'auto', // 縦方向にはみ出たらスクロールバーを表示
                
                boxShadow: 3, 
                transition: 'box-shadow 0.3s, transform 0.3s',
                '&:hover': {
                    boxShadow: 10,
                    transform: 'translateY(-2px)',
                    cursor: 'pointer',
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
            <CardActions sx={{ marginTop: 'auto' }}>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default Cardcomp;