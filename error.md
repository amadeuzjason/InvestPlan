## Error Type
Console Error

## Error Message
Cannot update a component (`ModulMandatoryPage`) while rendering a different component (`VideoPlayerPage`). To locate the bad setState() call inside `VideoPlayerPage`, follow the stack trace as described in https://react.dev/link/setstate-in-render


    at createConsoleError (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/node_modules_next_dist_115brz8._.js:2333:71)
    at handleConsoleError (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/node_modules_next_dist_115brz8._.js:3119:54)
    at console.error (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/node_modules_next_dist_115brz8._.js:3266:57)
    at scheduleUpdateOnFiber (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js:9036:201)
    at dispatchSetStateInternal (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js:5643:41)
    at dispatchSetState (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js:5615:9)
    at handleProgressUpdate (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/%5Broot-of-the-server%5D__0xm9022._.js:1020:9)
    at VideoPlayerPage.useEffect (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/%5Broot-of-the-server%5D__0xm9022._.js:699:33)
    at basicStateReducer (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js:4797:47)
    at updateReducerImpl (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js:4878:60)
    at updateReducer (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js:4829:16)
    at Object.useState (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js:15492:24)
    at exports.useState (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/node_modules_next_dist_compiled_0rpq4pf._.js:1754:36)
    at VideoPlayerPage (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/%5Broot-of-the-server%5D__0xm9022._.js:687:209)
    at Object.react_stack_bottom_frame (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js:15037:24)
    at renderWithHooks (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js:4620:24)
    at updateFunctionComponent (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js:6081:21)
    at beginWork (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js:6691:24)
    at runWithFiberInDEV (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js:965:74)
    at performUnitOfWork (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js:9555:97)
    at workLoopSync (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js:9449:40)
    at renderRootSync (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js:9433:13)
    at performWorkOnRoot (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js:9061:186)
    at performWorkOnRootViaSchedulerTask (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js:10255:9)
    at MessagePort.performWorkUntilDeadline (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/node_modules_next_dist_compiled_0rpq4pf._.js:2647:64)
    at ModulMandatoryPage (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/%5Broot-of-the-server%5D__0xm9022._.js:1194:262)
    at ClientPageRoot (file://D:/12/dicoding-dbscamp-2026/Capstone Project/InvestPlan/.next/dev/static/chunks/node_modules_next_dist_0tt2wve._.js:4461:50)

Next.js version: 16.2.2 (Turbopack)