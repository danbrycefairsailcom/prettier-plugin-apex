class ContinuationLines {
    void longMethodSignature(
      String superLongParamNameA,
      String superLongParamNameB,
      String superLongParamNameC,
      String superLongParamNameD
    );

    Potato longConstructorCall() {
      return new Potato(
        superLongParamNameA,
        superLongParamNameB,
        superLongParamNameC,
        superLongParamNameD
      );
    }

    void longMethodCall(Potato p) {
      p.grow(
        superLongParamNameA,
        superLongParamNameB,
        superLongParamNameC,
        superLongParamNameD
      );
    }

    void chainedMethodCalls(Potato p) {
      p.thisIsAReallyLongMethodA()
        .thisIsAReallyLongMethodB()
        .thisIsAReallyLongMethodC();
    }

    void chainedMethodCallsWithParams(Potato p) {
      p.water(
          superLongParamNameA,
          superLongParamNameB,
          superLongParamNameC,
          superLongParamNameD
        )
        .harvest(
          superLongParamNameA,
          superLongParamNameB,
          superLongParamNameC,
          superLongParamNameD
        )
        .eat(
          superLongParamNameA,
          superLongParamNameB,
          superLongParamNameC,
          superLongParamNameD
        );
    }

    Potato ternary(Boolean flag, Potato p1, Potato p2) {
      return flag
        ? p1.someReallyLongMutatorMethod()
        : p2.someReallyLongMutatorMethod();
    }
}