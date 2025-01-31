import { Spinner } from "@std/cli/unstable-spinner";

const spinner = new Spinner({ message: "Loading...", color: "yellow" });
spinner.start();

setTimeout(() => {
 spinner.stop();
 console.log("Finished loading!");
}, 3_000);