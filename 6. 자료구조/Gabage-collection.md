### 메모리 생존주기

1. 필요할 때 할당
2. 사용
3. 필요 없어지면 해제

### JS는 어떻게 메모리를 할당할까?

### ⇒ 값 선언 시 자동으로 할당.

```jsx
let a = 123;
let o = {};
// 메모리 할당!
```

### 할당된 메모리 해제는 언제할까?

### ⇒ 더 이상 필요가 없어지면 해제.

### 그럼 필요 없어진 때를 어떻게 알 수 있을까?

자바스크립트 같은 고수준 언어들은 GC(Garbage-collection)이라는 자동 메모리 관리 방법을 사용하며, GC에서 더 이상 필요하지 않은 메모리를 찾아 삭제한다.

### GC에서 필요 없어진 메모리를 찾는 알고리즘

- 참조-세기 (Reference-counting)

    가장 소박한 알고리즘. "더 이상 필요없는 오브젝트"를 "어떤 다른 오브젝트도 참조하지 않는 오브젝트"라고 정의하고 수집한다.

    ```jsx
    let x = {
    	a:{
    		b:2
    	}
    }
    let y = x.a
    // x.a는 두 개의 참조를 가진다.
    x = null
    // x가 null 이기 때문에 이제 x.a는 한 개의 참조를 갖는다( y )
    // 오브젝트의 a 속성이 y 변수에 의해 참조되므로 메모리가 해제되지 않는다.
    y = "bye"
    // 메모리 해제!
    ```

    단점: 순환 참조

    ```jsx
    function f(){
    	let o = {}
    	let o2 = {}
    	o.a = o2
    	o2.a = o
    	return "??"
    }
    f()
    // o와 o2는 서로 참조하는 순환 구조이고, f 함수 호출 이후 
    // 더 이상 필요없는 오브젝트이지만 메모리가 회수 되지 않는다.
    ```

- 표시하고-쓸기(Mark-and-sweep)

    이 알고리즘은 "더 이상 필요없는 오브젝트"를 "닿을 수 없는 오브젝트"로 정의한다.

    1. root 정보를 수집하고 이를 mark(표시, 기억) 한다.

    2. 루트가 참조하는 모든 객체를 방문하고 이를 mark 한다.

    3. mark 된 모든 객체에 방문하여 그 객체들이 참조하는 객체도 mark 한다.

    4. 도달 가능한 모든 객체를 방문할 때까지 반복한다.

    5. mark 되지 않은 모든 객체를 메모리에서 삭제한다.

    ![](https://images.velog.io/images/solo95/post/a25f0ef6-d40b-490f-82e4-4e9f12323291/image.png)

    단점: Fragmentation

    ![](https://images.velog.io/images/solo95/post/868d516f-048b-4eaf-ad58-92465abf6912/image.png)

    위와 같이 메모리가 조각난 상황을 Fragmentation이라고 한다. Garbage가 존재하던 메모리 공간이 제거된 후에는 비어있게 되어 메모리 전체를 봤을 땐 충분한 공간이 있는 것처럼 보이지만 메모리 할당이 불가능한 상황을 유발한다.

    ⇒ Compact 과정을 통해 해소 가능.

참고

[https://v8.dev/blog/trash-talk](https://v8.dev/blog/trash-talk)

[https://medium.com/@joongwon/jvm-garbage-collection-algorithms-3869b7b0aa6f](https://medium.com/@joongwon/jvm-garbage-collection-algorithms-3869b7b0aa6f)

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Memory_Management](https://developer.mozilla.org/ko/docs/Web/JavaScript/Memory_Management)

[https://ko.javascript.info/garbage-collection](https://ko.javascript.info/garbage-collection)
