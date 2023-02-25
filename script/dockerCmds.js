const util = require("util");
const exec = util.promisify(require("child_process").exec);

(async () => {
  const { stdout } = await exec("docker images -q");
  const latestDockerImage = stdout.split("\n")[0];
  printDockerCommands(latestDockerImage, registryName, apiKey);
})();

const tagName = "a06c0f2314f7";
const registryName = "kollektor-registry";
const apiKey =
  "dop_v1_203807f2db057e129b89c0effdbfc5b03ac628e59d0b3b198aaa7de494b68b8e";
const printDockerCommands = (image, registry, apiKey) => {
  const tag = `docker tag ${image} registry.digitalocean.com/${registry}/${tagName}`;
  const push = `docker push registry.digitalocean.com/${registry}/${tagName}`;
  const login = `docker login -u ${apiKey} -p ${apiKey} registry.digitalocean.com/${registry}`;
  const pull = `docker pull registry.digitalocean.com/${registry}/${tagName}`;
  const run = `docker run --env-file .env --restart unless-stopped -it -d -p 80:8080/tcp ${image}`;
  const listStopped = `docker ps -f "status=exited"`;
  console.log(
    "BUILDING \n" +
      tag +
      "\n" +
      push +
      "\n \nLOGIN \n" +
      login +
      "\n \nPULL \n" +
      pull +
      "\n" +
      run +
      "\n \n" +
      listStopped
  );
};
