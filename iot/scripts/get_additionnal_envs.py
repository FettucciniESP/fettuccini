"""
    Add additionnal ENVs to the program

    GIT_COMMIT: the git commit ID
    GIT_BRANCH: the current git branch
    GIT_TAG: the current git tag or "dev"

    _note: to get the full list of env at build time run: `pio run -t envdump > pouet.log` and look at "BUILD_FLAGS_
"""

import subprocess

Import("env")

def run_command(command):
    """
    run a command on the system
    """
    return subprocess.run(command, stdout=subprocess.PIPE, text=True).stdout

def get_additionnal_envs():
    """
    get the git commit/branch/tag of the project and return them
    """
    commit = run_command(["git", "rev-parse", "HEAD"])[:7]
    branch = run_command(["git", "rev-parse", "--abbrev-ref", "HEAD"])
    tag = run_command(["git", "tag", "-l", "--points-at", "HEAD"])

    items = [
        f"-D GIT_COMMIT=\\\"{commit}\\\"",
        f"-D GIT_BRANCH=\\\"{branch.strip()}\\\""
    ]
    if tag != "":
        items.append(f"-D GIT_TAG=\\\"{tag.strip()}\\\"")
    else:
        items.append("-D GIT_TAG=\\\"dev\\\"")
    return items

env.Append(
    BUILD_FLAGS=get_additionnal_envs()
)
