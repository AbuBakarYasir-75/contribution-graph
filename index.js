import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';
import random from 'random';

const git = simpleGit();
const path = './data.json';

const makeCommits = (n) => {
  if (n === 0) {
    console.log('✅ All commits done');
    return git.push();
  }

  const x = random.int(0, 54);
  const y = random.int(0, 6);

  const date = moment()
    .subtract(1, 'y')
    .add(x, 'w')
    .add(y, 'd')
    .format('YYYY-MM-DD HH:mm:ss');

  const data = { date };

  console.log(`📅 Commit date: ${date}`);

  jsonfile.writeFile(path, data, () => {
    git
      .add([path])
      .commit(date, { '--date': date })
      .then(() => makeCommits(n - 1));
  });
};

makeCommits(1000);
