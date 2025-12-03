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
    dummy: number;
}
// ===========================================


function OmeletteViewer() {
    // CSVファイルパス
    const targetCsvPath = `${import.meta.env.BASE_URL}data/map.csv`; 
    
    const [mapData, setMapData] = useState<mapObjProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    // カルーセル制御用のState
    const [normalIndex, setNormalIndex] = useState(0);  // 通常店のインデックス
    const [currentIndex, setCurrentIndex] = useState(0); // mapData 内の実インデックス


    // --- 2. カード切り替えロジック (循環ナビゲーション) ---
    const navigate = useCallback((direction: 'next' | 'prev' | 'random') => {
        const normalShops = mapData.filter(shop => shop.dummy !== 1);
        const dummyShops = mapData.filter(shop => shop.dummy === 1);

        if (direction === 'random') {
            const useDummy = Math.random() < 0.1; // 10% でダミー強制

            let targetShop;

            if (useDummy && dummyShops.length > 0) {
                // ダミーから必ず１つ
                targetShop = dummyShops[Math.floor(Math.random() * dummyShops.length)];
            } else {
                // 通常店舗からランダム
                targetShop = normalShops[Math.floor(Math.random() * normalShops.length)];
            }

            // mapData 内のインデックスに変換
            const realIndex = mapData.indexOf(targetShop);
            if (realIndex !== -1) setCurrentIndex(realIndex);

            // 通常店インデックスも反映（dummy のときは -1 になるので更新しない）
            const normIdx = normalShops.indexOf(targetShop);
            if (normIdx !== -1) setNormalIndex(normIdx);

            return;
        }

        // next / prev
        if (direction === 'next') {
            const nextIdx = (normalIndex + 1) % normalShops.length;
            setNormalIndex(nextIdx);
            setCurrentIndex(mapData.indexOf(normalShops[nextIdx]));
        } else {
            const prevIdx = (normalIndex - 1 + normalShops.length) % normalShops.length;
            setNormalIndex(prevIdx);
            setCurrentIndex(mapData.indexOf(normalShops[prevIdx]));
        }
        }, [mapData, normalIndex]);


    // --- 3. データ読み込みロジック (副作用) ---
    useEffect(() => {
        console.log("CSVデータを読み込み中:", targetCsvPath);
        papaparse.parse<mapObjProps>(targetCsvPath, {
            download: true,
            header: true,
            dynamicTyping: true,
            complete: (results: ParseResult<mapObjProps>) => { 
                if (results.errors.length) {
                    console.error("CSVパース中にエラーが発生しました:", results.errors);
                }

                const data = results.data;
                setMapData(data);
                console.log("CSVデータの読み込み完了:", data);

                // ここが重要！
                // 通常店の最初の index を currentIndex に設定
                const normalShops = data.filter(shop => shop.dummy !== 1);
                if (normalShops.length > 0) {
                    const firstIndex = data.indexOf(normalShops[0]);
                    setCurrentIndex(firstIndex);
                    setNormalIndex(0);
                }

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
                <h3 style={{ textAlign: "center" }}>
                    ({currentIndex + 1} / {mapData.filter(shop => shop.dummy !== 1).length} 件を表示中)
                </h3>
            </div>
        </div>
    );
}

export default OmeletteViewer;
export type { mapObjProps };