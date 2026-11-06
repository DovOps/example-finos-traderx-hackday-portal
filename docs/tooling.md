# Tool and package policy

Local portal: Python 3.14.3, isolated `.venv`, jsonschema 4.25.1 from public PyPI. No credentials or private feeds required. Other Python 3 versions may work but are untested.

Generation: Node 24.0.1, jq 1.8.1, Python 3.14.3, Git and npm on PATH. The shared env-loader checks versions and fails with a diagnostic; activate tools explicitly using your own version manager. It does not install tools or change HOME. npm uses the public registry and upstream lockfiles. Generation may access package registries; --dry-run means full layout without service startup, not offline or read-only.

Java, .NET, Gradle and runtime Node versions are supplied by the pinned upstream Dockerfiles and wrappers, rather than host Java/.NET installations. Baseline package resolution and build have not passed yet. Docker 28.1.1 and Compose 2.35.1 are available in the initial development environment; a supported runtime version policy remains part of the runtime gate.

Generation uses a temporary shared clone of the pinned submodule because upstream regenerates source documentation. The submodule stays untouched. Output is restricted to this overlay's generated directory; generation is sequential and locks the complete transform sequence. Use `bash pipeline/runtime.sh start|restart|test|status|stop` for the isolated lab Compose project. No generated-branch publish helper is implemented yet.

Portal: Docusaurus 3.10.1 and React 18.3.1 (matching the pinned upstream lockfile), with its own npm lockfile in website/. Install with `npm --prefix website ci`; build with `npm --prefix website run build`. The portal requires Node >=20; generation tool version checks remain separate.
