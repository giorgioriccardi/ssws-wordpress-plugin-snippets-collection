#!/usr/bin/env python
# NOTE: This script should be run from inside of a project's git repo.

import sys
import os
import tempfile
import shutil
import contextlib
import subprocess
import distutils
from distutils import dir_util
from shutil import copy2

# FRONTEND_REPO = 'git@gitlab.com:front-end-projects/templates-linters.git'
# FRONTEND_REPO = 'git@bitbucket.org:giorgioriccardi/templates-linters.git'
FRONTEND_REPO = 'https://giorgioriccardi@bitbucket.org/giorgioriccardi/templates-linters.git'

# Get the PROJECT_ROOT as the top level git repo.
PROJECT_ROOT = subprocess.Popen(['git', 'rev-parse', '--show-toplevel'], stdout=subprocess.PIPE).communicate()[0].rstrip()

@contextlib.contextmanager
def cd(newdir, cleanup=lambda: True):
    prevdir = os.getcwd()
    os.chdir(os.path.expanduser(newdir))
    try:
        yield
    finally:
        os.chdir(prevdir)
        cleanup()

@contextlib.contextmanager
def tempdir():
    dirpath = tempfile.mkdtemp()
    def cleanup():
        shutil.rmtree(dirpath)
    with cd(dirpath, cleanup):
        yield dirpath


print("Updating " + PROJECT_ROOT + " from repo " + FRONTEND_REPO)

with tempdir() as dirpath:
    # Clone the remote repo into $tmpdir
    subprocess.call(['git', 'clone', FRONTEND_REPO, dirpath])

    distutils.dir_util.copy_tree(dirpath + "/scripts", PROJECT_ROOT + "/scripts")

    copy2(dirpath + "/.editorconfig", PROJECT_ROOT)
    copy2(dirpath + "/.eslintrc", PROJECT_ROOT)
    copy2(dirpath + "/.sass-lint.yml", PROJECT_ROOT)
    copy2(dirpath + "/.lesshintrc", PROJECT_ROOT)
    copy2(dirpath + "/.babelrc", PROJECT_ROOT)
    copy2(dirpath + "/.pre-commit-config.yaml", PROJECT_ROOT)
    copy2(dirpath + "/README.md", PROJECT_ROOT + "/README-frontend.md")
