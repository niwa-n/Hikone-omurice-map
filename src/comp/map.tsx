import { useEffect, useState } from "react";
import papaparse, { type ParseResult } from "papaparse";

interface mapObjProps {
    name: string;
    place_x: number; 
    place_y: number;
    imgPath: string;
    loveLevel: number;
}

function MapComponent() {
    // 既存の会話で決めた正しいパスに修正
    const targetCsvPath = "/public/data/map.csv"; 
    
    // データ本体を保持するためのStateを型付きで定義
    const [mapData, setMapData] = useState<mapObjProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    // setCount はデータ本体の長さに置き換え、mapData.length を参照するようにするのが自然です

    useEffect(() => {
        papaparse.parse<mapObjProps>(targetCsvPath, {
            download: true,
            header: true,
            dynamicTyping: true, // place_x, place_y, loveLevelを数値として読み込む
            
            // completeコールバックの results に ParseResult<T> 型を使用
            complete: (results: ParseResult<mapObjProps>) => { 
                console.log("パース結果:", results.data);
                
                // データ本体とメタデータをログに出力
                if (results.errors.length) {
                    console.error("CSVパース中にエラーが発生しました:", results.errors);
                }

                // データの型を保証し、Stateに保存
                setMapData(results.data);
                setLoading(false);
            },
            error: (error) => {
                 console.error("CSVファイルの読み込みエラー:", error);
                 setLoading(false);
            }
        });
    }, []);

    return (
        <div>
            <h2>オムライスデータ ({mapData.length} 件)</h2>
            {loading ? (
                <p>データを読み込み中...</p>
            ) : (
                // データをリスト表示する部分をここに実装
                <ul>
                    {mapData.map((item, index) => (
                        <li key={index}>
                            **{item.name}** (Love: {item.loveLevel}) - 緯度: {item.place_x}, 経度: {item.place_y}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MapComponent;