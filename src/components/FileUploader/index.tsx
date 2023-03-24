// import { FileUploader as AwsFileUploader } from "@aws-amplify/ui-react";
import { Storage } from "aws-amplify";
import dayjs from "dayjs";
import {
  ActualFileObject,
  ProgressServerConfigFunction,
  ProcessServerChunkTransferOptions,
} from "filepond";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Particles from "react-particles";

import { loadFull } from "tsparticles";
import { Container, Engine } from "tsparticles-engine";

import { FileUplaod } from "./FilePond";

export const UserContext = createContext({ date: "", city: "" });

const FileUploader = () => {
  const userCtx = useContext(UserContext);
  const [done, setDone] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="mb-3 w-full max-w-4xl">
        {userCtx.city ? (
          <FileUplaod
            onprocessfiles={() => {
              setDone(true);

              setTimeout(() => {
                setDone(false);
              }, 5000);
            }}
            process={(
              fieldName: string,
              /** The actual file object to send. */
              file: ActualFileObject,
              metadata: { [key: string]: any },
              /**
               * Should call the load method when done and pass the returned server file id.
               * This server file id is then used later on when reverting or restoring a file
               * so that your server knows which file to return without exposing that info
               * to the client.
               */
              load: (p: string | { [key: string]: any }) => void,
              /** Call if something goes wrong, will exit after. */
              error: (errorText: string) => void,
              /**
               * Should call the progress method to update the progress to 100% before calling load().
               * Setting computable to false switches the loading indicator to infinite mode.
               */
              progress: ProgressServerConfigFunction,
              /** Let FilePond know the request has been cancelled. */
              abort: () => void,
              /**
               * Let Filepond know and store the current file chunk transfer id so it can track the
               * progress of the whole file upload
               */
              transfer: (transferId: string) => void,

              options: ProcessServerChunkTransferOptions
            ) => {
              Storage.put(`${userCtx.date}/${userCtx.city}/${file.name}`, file)
                .then((response) => {
                  load(response.key);
                })
                .catch(error);
            }}
          />
        ) : null}

        {done ? (
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              detectRetina: true,
              fullScreen: {
                zIndex: 1,
              },
              fpsLimit: 120,
              particles: {
                color: {
                  value: ["#FFFFFF", "#2563eb", "#000"],
                },
                move: {
                  direction: "bottom",
                  enable: true,
                  outModes: {
                    default: "out",
                  },
                  size: true,
                  speed: {
                    min: 1,
                    max: 3,
                  },
                },
                number: {
                  value: 500,
                  density: {
                    enable: true,
                    area: 800,
                  },
                },
                opacity: {
                  value: 1,
                  animation: {
                    enable: false,
                    startValue: "max",
                    destroy: "min",
                    speed: 0.3,
                    sync: true,
                  },
                },
                rotate: {
                  value: {
                    min: 0,
                    max: 360,
                  },
                  direction: "random",
                  move: true,
                  animation: {
                    enable: true,
                    speed: 60,
                  },
                },
                tilt: {
                  direction: "random",
                  enable: true,
                  move: true,
                  value: {
                    min: 0,
                    max: 360,
                  },
                  animation: {
                    enable: true,
                    speed: 60,
                  },
                },
                shape: {
                  type: ["circle", "square", "triangle", "polygon", "image"],
                  options: {
                    polygon: [
                      {
                        sides: 5,
                      },
                      {
                        sides: 6,
                      },
                    ],
                    image: [
                      {
                        src: "Flag_of_Israel.png",
                        width: 32,
                        height: 32,
                        particles: {
                          size: {
                            value: 16,
                          },
                        },
                      },
                    ],
                  },
                },
                size: {
                  value: {
                    min: 2,
                    max: 4,
                  },
                },
                roll: {
                  darken: {
                    enable: true,
                    value: 30,
                  },
                  enlighten: {
                    enable: true,
                    value: 30,
                  },
                  enable: true,
                  speed: {
                    min: 15,
                    max: 25,
                  },
                },
                wobble: {
                  distance: 30,
                  enable: true,
                  move: true,
                  speed: {
                    min: -15,
                    max: 15,
                  },
                },
              },
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export { FileUploader };
