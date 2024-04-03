import random
import threading
import time
from collections import deque

# 일정 시간 내에 입력을 받는 함수
def timed_input(timeout):
    def input_thread(result):
        result.append(input())

    result = []
    thread = threading.Thread(target=input_thread, args=(result,))
    thread.start()
    thread.join(timeout)
    return bool(result)

# 플레이어 리스트
PLAYERS = ['Adam', 'Brown', 'Cathy', 'User']
# 프로그래밍 언어 리스트
LANGUAGES = ['Python', 'CPP', 'Java', 'JavaScript']
# 카드 숫자 리스트
CARDS = [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 5]

# 카드 덱 생성 함수
def create_deck():
    deck = []
    for language in LANGUAGES:
        for card in CARDS:
            deck.append((language, card))
    random.shuffle(deck)
    return deck

# 카드 분배 함수
def distribute_cards(deck, num_players):
    return [deck[i::num_players] for i in range(num_players)]

# 게임 플레이 함수
def play_game(players, hands):
    current_scores = {language: 0 for language in LANGUAGES}
    center_pile = []
    recent_cards = deque(maxlen=4)
    num_players = len(players)
    player_index = 0

    while len(hands) > 1:
        current_player = players[player_index]
        language, card = hands[player_index].pop()
        print(f"{language} {card}")
        center_pile.append((language, card))
        recent_cards.append((language, card))

        # 최근 4개의 카드 중 가장 오래된 카드를 제거하고 해당 언어의 점수 감소
        if len(recent_cards) == 4:
            old_language, old_card = recent_cards.popleft()
            current_scores[old_language] -= old_card

        # 현재 카드의 언어 점수 증가
        current_scores[language] += card

        # 점수가 5점이 된 언어가 있는 경우
        if any(score == 5 for score in current_scores.values()):
            recent_cards.clear()
            # 3초 내에 입력이 있으면 해당 플레이어가 승자, 그렇지 않으면 랜덤으로 승자 선정
            winner_index = -1 if timed_input(3) else random.randint(0, len(hands) - 2)
            hands[winner_index].extend(center_pile)
            center_pile.clear()
            current_scores = {language: 0 for language in LANGUAGES}
            print(f"Winner is {players[winner_index]}")

        # 현재 플레이어의 카드가 모두 소진된 경우
        if not hands[player_index]:
            print(f"Player {current_player} is out of the game!")
            # 사용자 플레이어가 패배한 경우 게임 종료
            if current_player == 'User':
                print("End of Game")
                exit()
            del hands[player_index]
            del players[player_index]
            num_players -= 1
        else:
            player_index = (player_index + 1) % num_players

        time.sleep(2)

    # 게임 종료 시 최종 승자 출력
    print(f"Player {players[0]} wins the game!")

# 메인 함수
def main():
    deck = create_deck()
    num_players = len(PLAYERS)
    hands = distribute_cards(deck, num_players)
    play_game(PLAYERS, hands)

# 프로그램 실행
if __name__ == "__main__":
    main()
