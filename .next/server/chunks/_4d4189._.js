module.exports = {

"[project]/.next-internal/server/app/api/submit-answer/route/actions.js (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_dynamic__, p: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

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
"[project]/app/api/submit-answer/route.ts [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_dynamic__, p: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "POST": ()=>POST
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$web$2f$exports$2f$next$2d$response$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/web/exports/next-response.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@google/generative-ai/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/supabaseClient.ts [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const genAI = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](process.env.GOOGLE_API_KEY);
async function POST(request) {
    try {
        const { session_id, user_answer } = await request.json();
        if (!session_id || user_answer === undefined || user_answer === null) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$web$2f$exports$2f$next$2d$response$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].json({
                error: 'Missing required fields: session_id and user_answer'
            }, {
                status: 400
            });
        }
        const { data: session, error: sessionError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('math_problem_sessions').select('*').eq('id', session_id).single();
        if (sessionError || !session) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$web$2f$exports$2f$next$2d$response$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].json({
                error: 'Session not found'
            }, {
                status: 404
            });
        }
        const userAnswerNum = parseFloat(user_answer);
        const finalAnswerNum = parseFloat(session.final_answer);
        const tolerance = 0.01;
        const isCorrect = Math.abs(userAnswerNum - finalAnswerNum) < tolerance;
        const feedbackPrompt = `
You are a helpful Primary 5 math tutor. A student just answered a math problem.

Problem: ${session.problem_text}
Correct answer: ${session.final_answer}
Student's answer: ${user_answer}
Result: ${isCorrect ? 'CORRECT' : 'INCORRECT'}

Provide personalized, encouraging feedback in 2-3 sentences. 
- If correct: Praise them and briefly explain why the answer is right.
- If incorrect: Gently correct them, show the right answer, and give a hint about the method.

Keep it friendly and age-appropriate for a 10-11 year old.
`;
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash'
        });
        const result = await model.generateContent(feedbackPrompt);
        const response = await result.response;
        const feedback = response.text();
        const { data: submission, error: submissionError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('math_problem_submissions').insert({
            session_id,
            user_answer: userAnswerNum,
            is_correct: isCorrect,
            feedback
        }).select().single();
        if (submissionError) {
            console.error('Database error:', submissionError);
            throw submissionError;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$web$2f$exports$2f$next$2d$response$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].json({
            ...submission,
            correct_answer: session.final_answer
        });
    } catch (error) {
        console.error('Error submitting answer:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$web$2f$exports$2f$next$2d$response$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].json({
            error: error.message || 'Failed to submit answer'
        }, {
            status: 500
        });
    }
}

})()),

};

//# sourceMappingURL=_4d4189._.js.map