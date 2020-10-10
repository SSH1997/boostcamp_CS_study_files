## 프로세스란?

프로세스란 운영체제 입장에서 하나의 작업 단위이며, 컴퓨터에서 연속적으로 실행되고 있는 컴퓨터 프로그램을 말한다.

### 프로그램과 프로세스

프로그램은 일반적으로 하드 디스크 등의 보조기억장치에 저장된 실행 코드를 뜻하고, 프로세스는 프로그램을 구동하여 프로그램 자체와 프로그램의 상태가 메모리 상에서 실행되는 작업 단위를 지칭한다. 즉, 실행 중인 프로그램을 뜻한다. 예를 들어, 하나의 프로그램을 여러 번 구동하면 여러 개의 프로세스가 메모리 상에서 실행되는 것이다.

### 시분할 방식

하나의 cpu(프로세서)는 한 순간에 하나의 프로세스만 실행할 수 있다. 그럼에도 여러 프로세스를 동시에 실행시킬 수 있는 것은 cpu가 처리하는 시간을 잘게 쪼개 여러 프로세스에 배분하는 방식으로 동작하기 때문이다.

---

## 프로세스 메모리 구조

UNIX 시스템은 실행 중인 프로세스에게 4GB의 가상 메모리 공간을 할당하는데, 상위 1GB는 커널이, 하위 3GB는 사용자 프로그램이 차지한다.

![image](https://user-images.githubusercontent.com/49153756/95016525-769c2780-068e-11eb-9c04-22da6a232278.png)

### stack 영역

프로그램이 자동으로 사용하는 메모리 영역으로 함수 호출과 관계되는 지역변수와 매개변수가 저장된다. 함수 호출 시 생성되며, 함수가 끝나면 반환된다. stack 사이즈는 각 프로세스마다 할당되지만 프로세스가 메모리에 로드될 때 stack 사이즈가 고정되어 있어 런타임 시 stack 사이즈를 바꿀 수 없다. 명령 실행 시 자동으로 증가 또는 감소하기 때문에 보통 메모리의 마지막 번지를 지정한다.

### heap 영역

필요에 의해 메모리를 동적으로 할당할 때 사용하는 메모리 영역으로 동적 메모리 영역이라고 부른다. C 에서 `malloc()` `calloc()` 등의 함수를 사용하여 메모리 크기를 할당할 수 있으며, 메모리 주소 값에 의해서만 참조되고 사용되는 영역이다.

- 위의 stack과 heap영역은 사실 같은 공간을 공유한다. heap이 메모리의 낮은 주소부터 할당되면 stack은 높은 주소부터 할당되는 식이다. 그래서 각 영역이 상대 공간을 침범하는 일이 발생할 수 있는데 이를 각각 `stack overflow`, `heap overflow` 라고 한다.

### Data 영역 (BSS, GVAR)

프로그램이 실행될 때 생성되고 프로그램이 종료되면 시스템에 반환되며, 전역변수, 정적변수, 배열, 구조체 등이 저장된다. Data 영역은 다시 `BSS` 영역과 `Data(GVAR)` 영역으로 나누어지는데, 초기화된 데이터는 Data 영역에 저장되고, 초기화되지 않은 데이터는 BSS 영역에 저장된다.

- BSS, Data로 구분하는 이유?

초기화 된 데이터는 초기 값을 저장해야 하므로 Data 영역에 저장되어 rom 에 저장된다. 하지만 초기화 되지 않은 데이터 까지 rom 에 저장되면 큰 size의 rom이 필요하므로 구분한다. ( 초기화 되지 않은 데이터는 ram에 저장)

### Text (Code) 영역

텍스트 영역은 실행 명령을 포함하는 **코드들이 들어가는 부분**이다.

프로그램을 시작 할 때 컴파일한 프로그램(기계어)이 저장되어 있고, **읽기 전용 영역**이기에 프로세스가 함부로 변경 할 수 없고 변경 시 오류를 발생시킨다. 그리고 이 영역은 변경되지 않는 불변의 부분이므로 공유 할 수 있는 영역이다.

코드 자체를 구성하는 메모리 영역으로 Hex 파일이나 Bin 파일 메모리이다. 프로그램 명령이 위치하는 곳으로 기계어로 제어되는 메모리 영역이다.

## Context Switching

멀티 프로세스 환경에서 CPU가 어떤 하나의 프로세스를 실행하고 있는 상태에서 인터럽트 요청에 의해 다음 우선 순위의 프로세스가 실행되어야 할 때 기존의 프로세스의 상태 또는 레지스터 값(Context)을 저장하고 CPU가 다음 프로세스를 수행하도록 새로운 프로세스의 상태 또는 레지스터 값(Context)을 교체하는 작업을 `Context Switching`이라 한다.

### Intterupt(인터럽트)

인터럽트는 CPU가 프로그램을 실행하고 있을 때, 실행 중인 프로그램 외부에서 예외 상황이 발생하여 처리가 필요한 경우 CPU에게 알려 예외 상황을 처리할 수 있도록 하는 것이다.

- **`Context Switching` 을 위한 인터럽트 종류**
    - `I/O request` : 입출력 요청
    - `time slice expired` : CPU 사용시간이 만료
    - `fork a child` : 자식 프로세스 생성
    - `wait for an interrupt` : 인터럽트 처리 대기

![image](https://user-images.githubusercontent.com/49153756/95016480-389f0380-068e-11eb-93c0-0da3b80b5f57.png)

위 이미지는 공룡책에서 나오는 `Context Switching` 에 대한 이미지이다. `P0` 가 실행 중인데, `intterupt` 가 발생했다. 그럼 현재 실행 중이었던 `P0` 의 정보들(`PC(Program Counter)`, `SP(Stack Pointer)` 등의 레지스스터 정보)을 해당 프로세스의 `PCB` (여기서는 `PCB0`)에 저장한다.  그리고 `P1` 을 실행시키기 위해 `PCB1` 에 저장되어 있던 `P1` 의 정보를 가져와 프로세스를 실행시킨다.

이 때, `Context Switching` 이 진행되는 동안 CPU는 아무 일도 하지 못하기 때문에 `Context Switching` 이 잦아지면 `overhead`가 많이 발생하게 되어 효율이 떨어질 수 있다.

[ `Context Switching` 에서 `overhead` :  `Context Switching` 에 걸린 시간과 메모리 ]

**그렇다면 이렇게 `overhead` 가 발생하게 되는데도 `Context Switching` 을 하는 이유는 뭘까?**

→ 프로세스 수행 중 `I/O 이벤트` 가 발생해 `waiting` 상태로 전환시키는 경우, CPU가 아무런 일을 하지 않아 발생하는 낭비보다 `overhead` 가 발생하더라도 `Context Switching` 을 통해 다른 프로세스를 실행시키는 것이 더 효율적이기 때문이다.

## PCB(프로세스 제어 블록)

- 운영체제가 프로세스를 제어하기 위해 정보를 저장하는 자료구조이다.
- 프로세스 상태 관리와 `Context Switching`을 위해 필요하다.
- 모든 프로세스는 고유의 PCB를 가지며, 프로세스 생성 시 PCB가 생성되고 주기억장치에 유지되다가 프로세스가 완료되면 PCB는 제거된다.

**PCB에서 유지되는 정보**

- PID : 운영체제가 각 프로세스를 식별하기 위해 부여된 프로세스 식별번호
- 프로세스 상태 : 준비, 대기, 실행 등의 상태 정보
- PC(프로그램 카운터) : CPU가 다음에 실행할 명령어를 가리키는 값
- Priority (스케줄링 우선순위) : 운영체제가 여러 개의 프로세스가 CPU에서 실행되는 순서를 결정하는 것을 스케줄링이라 하는데, 이 스케줄링에서의 우선순위 정보
- CPU 레지스터 및 일반 레지스터
- 메모리 관리 정보 : 해당 프로세스의 주소 공간 등의 정보
- 입출력 상태 정보 : 프로세스에 할당된 입출력 장치 목록, 열린 파일 목록 등
- 계정 정보 : CPU 사용 시간, 실제 사용된 시간 등
- 포인터
    - 부모 프로세스와 자식 프로세스에 대한 포인터
    - 프로세스가 위치한 메모리 주소에 대한 포인터
    - 할당된 자원에 대한 포인터

---
> 참조
> 운영체제 10판
> process
> https://ko.wikipedia.org/wiki/프로세스
> https://recorda.tistory.com/entry/20160503프로세스-메모리-구조
> https://bnzn2426.tistory.com/56?category=778369
> https://inuplace.tistory.com/290?category=884574
> https://jwprogramming.tistory.com/16
> https://bowbowbow.tistory.com/16
> https://www.programmersought.com/article/98613694619/
> https://m.blog.naver.com/PostView.nhn?blogId=ryutuna&logNo=100188393620&proxyReferer=https:%2F%2Frecorda.tistory.com%2Fentry%2F20160503프로세스-메모리-구조
> http://tcpschool.com/c/c_memory_structure
> Context Switching
> https://jeong-pro.tistory.com/93
> https://velog.io/@jacob0122/Context-Switching
> https://jhnyang.tistory.com/33
> https://jins-dev.tistory.com/entry/컨텍스트-스위치Context-Switching-에-대한-정리
> https://velog.io/@adam2/%EC%9D%B8%ED%84%B0%EB%9F%BD%ED%8A%B8
