//inportは、別ファイルからコードを持ってくるためのもの
// 変数や関数はキャメルケース（小文字はじまり）、クラスはパスカルケース（大文字はじまり）で命名する
import type { Category } from "../types";

export const DEFAULT_CATEGORIES: Category[] = [
  { id: "cat-001", name: "学習", color: "#1D9E75", isStudy: true },
  { id: "cat-002", name: "仕事", color: "#534AB7", isStudy: false },
  { id: "cat-003", name: "プライベート", color: "#D4537E", isStudy: false },
  { id: "cat-004", name: "その他", color: "#888780", isStudy: false },
];
