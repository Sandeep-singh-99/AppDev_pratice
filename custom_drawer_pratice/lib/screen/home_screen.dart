import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 300),
  );

  static const maxSlide = 265;
  static const maxRotate = -0.1;
  static const dragStatPosition = 0.6;
  int _counter = 0;
  bool _canDragged = false;

  void _openCloseDrawer() =>
      _controller.isDismissed ? _controller.forward() : _controller.reverse();

  void _onDragStart(DragStartDetails details) {
    bool isDragLeft =
        _controller.isDismissed && details.globalPosition.dx < dragStatPosition;
    bool isDragRight =
        _controller.isCompleted && details.globalPosition.dx > dragStatPosition;
    _canDragged = isDragLeft || isDragRight;
  }

  void _onDragUpdate(DragUpdateDetails details) {
    if (_canDragged) {
      var delta = (details.primaryDelta ?? 0) / maxSlide;
      _controller.value += delta;
    }
  }

  void _onDragEnd(DragEndDetails details) {
    if (_controller.isDismissed || _controller.isCompleted) {
      return;
    }

    if (details.velocity.pixelsPerSecond.dx.abs() >= 365) {
      var visualVelocity =
          details.velocity.pixelsPerSecond.dx /
          MediaQuery.of(context).size.width;
      _controller.fling(velocity: visualVelocity);
    } else if (_controller.value < 0.5) {
      _controller.reverse();
    } else {
      _controller.forward();
    }
  }

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onHorizontalDragStart: _onDragStart,
      onHorizontalDragUpdate: _onDragUpdate,
      onHorizontalDragEnd: _onDragEnd,
      child: AnimatedBuilder(
        animation: _controller,
        builder: (context, child) {
          var slide = maxSlide * _controller.value;
          var rotate = maxRotate * _controller.value;
          var scale = 1 - (_controller.value * 0.4);
          return Stack(
            children: [
              _homeDrawer(context),
              Transform(
                transform:
                    Matrix4.identity()
                      ..translate(slide)
                      ..rotateZ(rotate)
                      ..scale(scale),
                alignment: Alignment.centerLeft,
                child: _homeView(context),
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _homeView(BuildContext context) => Scaffold(
  appBar: AppBar(
    leading: IconButton(onPressed: _openCloseDrawer, icon: const  Icon(Icons.menu)),
    title: const Text('Custom Drawer Pratice'),
  ),
  body: Center(
    child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text('You have pushed the button this many times'),
        Text('$_counter', style: Theme.of(context).textTheme.headlineMedium),
      ],
    ),
  ),
  floatingActionButton: FloatingActionButton(
    onPressed: _incrementCounter,
    tooltip: 'Increment',
    child: const Icon(Icons.add),
  ),
);

Widget _homeDrawer(BuildContext context) => Material(
  child: Container(
    height: MediaQuery.of(context).size.height,
    width: MediaQuery.of(context).size.width,
    color: Colors.blueAccent,
    child: Column(
      mainAxisSize: MainAxisSize.max,
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        FlutterLogo(
          size: 180,
          style: FlutterLogoStyle.horizontal,
          textColor: Colors.white,
        ),
        ListTile(
          leading: Icon(Icons.home),
          title: Text('Home'),
        ),
        ListTile(
          leading: Icon(Icons.favorite),
          title: Text('Favorite'),
        ),
        ListTile(
          leading: Icon(Icons.settings),
          title: Text('Settings'),
        ),
        ListTile(
          leading: Icon(Icons.info),
          title: Text('About'),
        ),
      ],
    ),
  ),
);
}


