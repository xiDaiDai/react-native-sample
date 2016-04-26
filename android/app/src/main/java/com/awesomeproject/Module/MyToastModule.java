package com.awesomeproject.Module;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by admin on 2016/4/19.
 */
public class MyToastModule extends ReactContextBaseJavaModule {
    private static final String DURATION_SHORT = "short";
    private static final String DURATION_LONG = "long";

    public MyToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MyToastAndroid";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        HashMap<String,Object> map = new HashMap<>();
        map.put(DURATION_SHORT, Toast.LENGTH_SHORT);
        map.put(DURATION_LONG,Toast.LENGTH_LONG);
        return map;
    }

    @ReactMethod
    public void show(String message,int duration){
        Toast.makeText(getReactApplicationContext(),message,duration).show();
    }

    @Override
    public boolean canOverrideExistingModule() {
        return true;
    }
}
