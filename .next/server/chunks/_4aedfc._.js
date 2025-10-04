module.exports = {

"[project]/.next-internal/server/app/api/generate-problem/route/actions.js (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_dynamic__, p: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

__turbopack_export_value__({});

}.call(this) }),
"[project]/lib/supabaseClient.ts [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_dynamic__, p: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "supabase": ()=>supabase
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$7b$locals$7d$__ = __turbopack_import__("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-rsc] (ecmascript) {locals}");
"__TURBOPACK__ecmascript__hoisting__location__";
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://ibcvzmyjmjghxgdbdktq.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliY3Z6bXlqbWpnaHhnZGJka3RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1NTE4MTAsImV4cCI6MjA3NTEyNzgxMH0.FQ2Vdgap9nfzEkXqpiy6dvgpG_FtQvPsxbbENIOY4gk");
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
}
const supabase = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$7b$locals$7d$__["createClient"](supabaseUrl, supabaseAnonKey);

})()),
"[project]/app/api/generate-problem/route.ts [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_dynamic__, p: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "GET": ()=>GET
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$web$2f$exports$2f$next$2d$response$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/web/exports/next-response.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@google/generative-ai/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/supabaseClient.ts [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const genAI = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](process.env.GOOGLE_API_KEY);
const SYLLABUS_CONTEXT = `
You are generating math word problems for Primary 5 students in Singapore following the official syllabus.

Topics include:
- Whole Numbers (up to 10 million, four operations, order of operations)
- Fractions (division as fractions, adding/subtracting mixed numbers, multiplying fractions)
- Decimals (multiply/divide by 10, 100, 1000, measurement conversions)
- Percentage (finding %, discount, GST, interest)
- Rate (rate per unit)
- Area & Volume (triangle, composite figures, cube/cuboid, volume of liquid)
- Geometry (angles, properties of shapes)

Generate a creative word problem with a real-world context that Primary 5 students can relate to.
The problem should test one of the topics above.
Provide ONLY a JSON response with this exact structure:
{
  "problem_text": "the word problem text",
  "final_answer": numerical_answer_only
}

Do not include any markdown, explanation, or additional text. Only return valid JSON.
`;
async function GET() {
    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash'
        });
        const result = await model.generateContent(SYLLABUS_CONTEXT);
        const response = await result.response;
        const text = response.text();
        let problemData;
        try {
            const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
            problemData = JSON.parse(cleanedText);
        } catch (parseError) {
            console.error('Failed to parse AI response:', text);
            throw new Error('Invalid AI response format');
        }
        if (!problemData.problem_text || typeof problemData.final_answer !== 'number') {
            throw new Error('AI response missing required fields');
        }
        const { data: session, error: dbError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('math_problem_sessions').insert({
            problem_text: problemData.problem_text,
            final_answer: problemData.final_answer
        }).select().single();
        if (dbError) {
            console.error('Database error:', dbError);
            throw dbError;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$web$2f$exports$2f$next$2d$response$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].json(session);
    } catch (error) {
        console.error('Error generating problem:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$web$2f$exports$2f$next$2d$response$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].json({
            error: error.message || 'Failed to generate problem'
        }, {
            status: 500
        });
    }
}

})()),

};

//# sourceMappingURL=_4aedfc._.js.map