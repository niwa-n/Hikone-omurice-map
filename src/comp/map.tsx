import { useEffect, useState, useCallback } from "react";
import papaparse, { type ParseResult } from "papaparse";
import Cardcomp from "./card"; 
import { Stack } from "@mui/material";

// ===========================================
// 🎨 1. データ型定義 (このファイルに統合)
// ===========================================
// CSVの各行（オムライスの店舗データ）の型を定義
interface mapObjProps {
    name: string;
    place_x: number; 
    place_y: number;
    imgPath: string;
    loveLevel: number;
}
// ===========================================


function OmeletteViewer() {
    // CSVファイルパス
    const targetCsvPath = "/public/data/map.csv"; 
    
    const [mapData, setMapData] = useState<mapObjProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    // カルーセル制御用のState
    const [currentIndex, setCurrentIndex] = useState(0); 

    // --- 2. カード切り替えロジック (循環ナビゲーション) ---
    const navigate = useCallback((direction: 'next' | 'prev' | 'random') => {
        const total = mapData.length;
        if (total === 0) return;

        setCurrentIndex(prevIndex => {
            if (direction === 'next') {
                // 次へ: 循環ロジック
                return (prevIndex + 1) % total; 
            } else if (direction === 'prev') {
                // 前へ: 循環ロジック
                return (prevIndex - 1 + total) % total; 
            } else if (direction === 'random') {
                // ランダムへ: 既存のインデックスとは異なる値を生成
                let newIndex;
                do {
                    // 0からtotal-1までの整数をランダムに生成
                    newIndex = Math.floor(Math.random() * total);
                } while (newIndex === prevIndex && total > 1); // 項目が2つ以上ある場合、現在のインデックスと異なることを保証
                
                return newIndex;
            }
            // 未定義のdirectionが渡された場合は何もしない
            return prevIndex;
        });
    }, [mapData.length]);


    // --- 3. データ読み込みロジック (副作用) ---
    useEffect(() => {
        papaparse.parse<mapObjProps>(targetCsvPath, {
            download: true,
            header: true,
            dynamicTyping: true,
            complete: (results: ParseResult<mapObjProps>) => { 
                if (results.errors.length) {
                    console.error("CSVパース中にエラーが発生しました:", results.errors);
                }
                setMapData(results.data);
                setLoading(false);
            },
            error: (error) => {
                 console.error("CSVファイルの読み込みエラー:", error);
                 setLoading(false);
            }
        });
    }, []);


    // --- 4. レンダリング部分 ---
    if (loading) {
        return <p>データを読み込み中...</p>;
    }
    
    if (mapData.length === 0) {
        return <p>オムライスデータが見つかりませんでした。</p>;
    }
    
    const currentShop = mapData[currentIndex];

    return (
        <div className="viewer-container">
            <h2>🍳 彦根オムライスマップ (PC版)</h2>
            <h3>({currentIndex + 1} / {mapData.length} 件を表示中)</h3>

            <div className="card-carousel">

                <Stack direction="row" spacing={2} sx={{ marginTop: 2, marginBottom: 2 }} justifyContent="center" className="card-wrapper">
                    {/* PREVボタン */}
                    <button 
                        onClick={() => navigate('prev')} 
                        className="nav-button prev"
                    >
                        &lt; 前へ
                    </button>

                    {/* 現在のカード */}
                    <Cardcomp shop={currentShop} />
                    
                    {/* NEXTボタン */}
                    <button 
                        onClick={() => navigate('next')} 
                        className="nav-button next"
                    >
                        次へ &gt;
                    </button>
                </Stack>

                <Stack direction="row" spacing={10} sx={{ marginTop: 3 }} justifyContent="center">
                    <button 
                        onClick={() => navigate('random')} 
                        className="nav-button random"
                    >
                        🎲 ランダム表示
                    </button>
                </Stack>
            </div>
        </div>
    );
}

export default OmeletteViewer;
export type { mapObjProps };