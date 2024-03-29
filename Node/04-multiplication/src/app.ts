import { multiplicationTable } from "./app.logic";
import { yarg } from "./config/plugins/args.plugin";
import { ServerApp } from "./presentation/server-app";

// console.log(process.argv);
// console.log(yarg);

// * Lo siguiente es una fucion anonima autoinvocada.
(async() => {    
    await main();
})();

async function main() {
    const { b:base, l:limit, s:showTable, n:fileName, d:fileDestination } = yarg;
    // multiplicationTable(base, limit, show)

    ServerApp.run( {base, limit, showTable, fileName, fileDestination} );
};
