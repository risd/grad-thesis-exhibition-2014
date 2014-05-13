import logging
import subprocess
import atexit

from apscheduler.scheduler import Scheduler

logging.basicConfig()
logger = logging.getLogger(__name__)
sched = Scheduler(daemon=True)
atexit.register(lambda: sched.shutdown(wait=False))


@sched.interval_schedule(minutes=65)
def fetch_behance():
    new_behance = subprocess.check_call(
                    ['python',
                     'data/fetch.py'])
    logger.info(new_behance)

sched.start()

while True:
    pass