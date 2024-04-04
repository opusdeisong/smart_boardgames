import readline from 'readline';

// 플레이어 리스트
const PLAYERS = ['Adam', 'Brown', 'Cathy', 'User'];
// 프로그래밍 언어 리스트
const LANGUAGES = ['Python', 'CPP', 'Java', 'JavaScript'];
// 카드 숫자 리스트
const CARDS = [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 5];

// 카드 덱 생성 함수
function createDeck(): [string, number][] {
  const deck: [string, number][] = [];
  for (const language of LANGUAGES) {
    for (const card of CARDS) {
      deck.push([language, card]);
    }
  }
  return shuffle(deck);
}

// 카드 분배 함수
function distributeCards(deck: [string, number][], numPlayers: number): [string, number][][] {
  return Array.from({ length: numPlayers }, (_, i) => deck.filter((_, idx) => idx % numPlayers === i));
}

// 셔플 함수
function shuffle<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

// 게임 플레이 함수
async function playGame(players: string[], hands: [string, number][][]) {
  const currentScores: { [key: string]: number } = LANGUAGES.reduce((acc, language) => ({ ...acc, [language]: 0 }), {});
  const centerPile: [string, number][] = [];
  const recentCards: [string, number][] = [];
  let numPlayers = players.length;
  let playerIndex = 0;

  while (hands.length > 1) {
    const currentPlayer = players[playerIndex];
    const [language, card] = hands[playerIndex].pop()!;
    console.log(`${language} ${card}`);
    centerPile.push([language, card]);
    recentCards.push([language, card]);

    // 최근 4개의 카드 중 가장 오래된 카드를 제거하고 해당 언어의 점수 감소
    if (recentCards.length === 4) {
      const [oldLanguage, oldCard] = recentCards.shift()!;
      currentScores[oldLanguage] -= oldCard;
    }

    // 현재 카드의 언어 점수 증가
    currentScores[language] += card;

    // 점수가 5점이 된 언어가 있는 경우
    if (Object.values(currentScores).some(score => score === 5)) {
      recentCards.length = 0;
      const inputResult = await timedInput(1.5);

      if (inputResult !== null) {
        const winnerIndex = playerIndex;
        hands[winnerIndex].push(...centerPile);
        centerPile.length = 0;
        Object.keys(currentScores).forEach(language => (currentScores[language] = 0));
        console.log(`Winner is ${players[winnerIndex]}`);
      } else {
        const winnerIndex = Math.floor(Math.random() * (hands.length - 1));
        hands[winnerIndex].push(...centerPile);
        centerPile.length = 0;
        Object.keys(currentScores).forEach(language => (currentScores[language] = 0));
        console.log(`Winner is ${players[winnerIndex]}`);
      }
    } else {
      const wrongInput = await timedInput(1.5);

      if (wrongInput !== null) {
        console.log(`Player ${players[players.length - 1]} pressed the bell at the wrong time!`);
        // 페널티 적용 (예: 해당 플레이어의 카드 한 장을 센터 파일에 추가)
        if (hands[playerIndex].length > 0) {
          const penaltyCard = hands[playerIndex].pop()!;
          centerPile.push(penaltyCard);
          console.log(`Player ${players[players.length - 1]} loses a card as a penalty.`);
          if (hands[playerIndex].length === 0) {
            console.log(`Player ${players[players.length - 1]} is out of the game!`);
            if (players[players.length - 1] === 'User') {
              console.log('End of Game');
              process.exit();
            }
            hands.pop();
            players.pop();
            numPlayers--;
            playerIndex = playerIndex % numPlayers;
          }
        }
      }
    }

    // 현재 플레이어의 카드가 모두 소진된 경우
    if (hands[playerIndex].length === 0) {
      console.log(`Player ${currentPlayer} is out of the game!`);
      // 사용자 플레이어가 패배한 경우 게임 종료
      if (currentPlayer === 'User') {
        console.log('End of Game');
        process.exit();
      }
      hands.splice(playerIndex, 1);
      players.splice(playerIndex, 1);
      numPlayers--;
    } else {
      playerIndex = (playerIndex + 1) % numPlayers;
    }
  }

  // 게임 종료 시 최종 승자 출력
  console.log(`Player ${players[0]} wins the game!`);
}

// 일정 시간 내에 입력을 받는 함수
function timedInput(timeout: number): Promise<string | null> {
  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const timer = setTimeout(() => {
      rl.close();
      resolve(null);
    }, timeout * 1000);

    rl.question('', answer => {
      clearTimeout(timer);
      rl.close();
      resolve(answer);
    });
  });
}

// 메인 함수
async function main() {
  const deck = createDeck();
  const numPlayers = PLAYERS.length;
  const hands = distributeCards(deck, numPlayers);
  await playGame(PLAYERS, hands);
}

// 프로그램 실행
main();
