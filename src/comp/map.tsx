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
    const navigate = useCallback((direction: 'next' | 'prev') => {
        const total = mapData.length;
        if (total === 0) return;

        setCurrentIndex(prevIndex => {
            if (direction === 'next') {
                return (prevIndex + 1) % total; 
            } else {
                return (prevIndex - 1 + total) % total; 
            }
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
                {/* 現在のカード */}
                <Cardcomp shop={currentShop} />

                <Stack direction="row" spacing={2} sx={{ marginTop: 2, marginBottom: 2 }} justifyContent="center">
                    {/* PREVボタン */}
                    <button 
                        onClick={() => navigate('prev')} 
                        className="nav-button prev"
                    >
                        &lt; 前へ
                    </button>
                    
                    {/* NEXTボタン */}
                    <button 
                        onClick={() => navigate('next')} 
                        className="nav-button next"
                    >
                        次へ &gt;
                    </button>
                </Stack>
            </div>
            
            <p className="debug-info">
                現在地: {currentShop.name} (Love Level: {currentShop.loveLevel})
            </p>
        </div>
    );
}

export default OmeletteViewer;
export type { mapObjProps };