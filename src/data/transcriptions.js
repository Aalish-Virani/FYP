export interface Transcription {
  raw: string;
  predicted: string;
}

export const transcriptions: Record<string, Transcription> = {
  file1: {
    raw: "السلام علیکم، یہ [missing] گفتگو ہے۔ براہ کرم [missing] کریں۔",
    predicted: "السلام علیکم، یہ پہلی گفتگو ہے۔ براہ کرم مدد کریں۔",
  },
  file2: {
    raw: "ہیلو، کیا آپ [missing] کے بارے میں بتا سکتے ہیں؟ یہ [missing] ہے۔",
    predicted: "ہیلو، کیا آپ پروجیکٹ کے بارے میں بتا سکتے ہیں؟ یہ ضروری ہے۔",
  },
  file3: {
    raw: "اچھا، ہم [missing] ملاقات کریں گے۔ کیا آپ [missing] ہیں؟",
    predicted: "اچھا، ہم کل ملاقات کریں گے۔ کیا آپ تیار ہیں؟",
  },
  file4: {
    raw: "یہ ایک [missing] کال ہے۔ براہ کرم [missing] رہیں۔",
    predicted: "یہ ایک اہم کال ہے۔ براہ کرم خاموش رہیں۔",
  },
  file5: {
    raw: "میں آپ سے [missing] کے بارے میں بات کرنا چاہتا ہوں۔ [missing] ممکن ہے؟",
    predicted: "میں آپ سے کاروبار کے بارے میں بات کرنا چاہتا ہوں۔ کیا ممکن ہے؟",
  },
  file6: {
    raw: "ہمیں [missing] کی ضرورت ہے۔ کیا آپ [missing] کر سکتے ہیں؟",
    predicted: "ہمیں فنڈنگ کی ضرورت ہے۔ کیا آپ تعاون کر سکتے ہیں؟",
  },
  file7: {
    raw: "یہ [missing] بہت اہم ہے۔ براہ کرم [missing] دیں۔",
    predicted: "یہ پروجیکٹ بہت اہم ہے۔ براہ کرم توجہ دیں۔",
  },
  file8: {
    raw: "ہیلو، کیا ہم [missing] پر بات کر سکتے ہیں؟ یہ [missing] ہے۔",
    predicted: "ہیلو، کیا ہم منصوبے پر بات کر سکتے ہیں؟ یہ فوری ہے۔",
  },
  file9: {
    raw: "میں [missing] کے بارے میں سوچ رہا ہوں۔ کیا آپ [missing] ہیں؟",
    predicted: "میں مستقبل کے بارے میں سوچ رہا ہوں۔ کیا آپ متفق ہیں؟",
  },
  file10: {
    raw: "یہ آخری [missing] ہے۔ براہ کرم [missing] کریں۔",
    predicted: "یہ آخری میٹنگ ہے۔ براہ کرم شرکت کریں۔",
  },
};