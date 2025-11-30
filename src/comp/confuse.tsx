import { useNavigate } from "react-router-dom";

function ComingSoon() {
    const navigate = useNavigate();

    return (
        <div style={{ 
        textAlign: "center", 
        marginTop: "120px",
        padding: "20px"
        }}>
            <h1>📄 準備中のページです</h1>
            <p>コンテンツは近日中に実装予定です。</p>
            <p>しばらくお待ちください 🙇‍♂️</p>
            <button 
                onClick={() => navigate('/')} 
            >
                🏠 ホームに戻る
            </button>
        </div>
    );
}

export default ComingSoon;