# Demo of React Native Radar

This project is based on https://github.com/fullStackOasis/react-native-movies-maps-issue


Start by signing up at [radar.io](https://radar.io/documentation/sdk/react-native) as a dev. It's free.

```
npm install --save react-native-radar
```

Add your google maps key by copying your `google_maps_api.xml` into `android/app/src/main/res/values` dir.

Update `app/build.gradle` with:

```
dependencies {
  implementation 'io.radar:sdk:3.0.0'
}
```

Follow the documentation to initialize `Radar` in `MainApplication.java`, found in `./android/app/src/main/`:

First, open `google_maps_api.xml`, and add your publishable key there. It should look something like this:
```
<resources>
        <string name="google_maps_key" templateMergeStrategy="preserve" translatable="false">AIz...</string>
        <string name="radar_publishable_test_key">prj_test_pk_...</string>
</resources>
```

Next, open `MainApplication.java` and add this code to the bottom of your `onCreate` method:
```
Radar.initialize(this, getString(R.string.radar_publishable_test_key));
```
Don't forget to import `Radar` at the top:
```
import io.radar.sdk.Radar;
```

Then integrate `Radar` with your React Native application. You can use the demo code in `MapsScreen.js` as a quick start guide.