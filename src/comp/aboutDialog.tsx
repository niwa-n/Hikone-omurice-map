// AboutDialog.tsx
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

type Props = {
    open: boolean;
    onClose: () => void;
};

function AboutDialog({ open, onClose }: Props) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>このサイトについて</DialogTitle>
            <DialogContent dividers>
                <Typography>
                    このサイトは、彦根市内のオムライス提供店をデータベース化した非公式の個人プロジェクトです。
                    <br /><br />
                    店舗データは手作業で更新しており、正確性を保証するものではありません。
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    閉じる
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AboutDialog;