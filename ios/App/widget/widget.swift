//
//  widget.swift
//  widget
//
//  Created by Richard Dean Jenkins on 05/02/2026.
//

import WidgetKit
import SwiftUI

struct CommunityEntry: TimelineEntry {
    let date: Date
    let riverLevel: String
    let airQuality: String
}

struct CommunityWidgetEntryView : View {
    var entry: CommunityEntry

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("Digital Twin")
                .font(.caption)
                .bold()
                .foregroundColor(.secondary)
                
            HStack {
                Text("🌊 River:")
                Text(entry.riverLevel).bold()
            }
            
            HStack {
                Text("🍃 Air:")
                Text(entry.airQuality).bold()
            }
        }
        .padding()
        .containerBackground(for: .widget) {
                    Color(.systemBackground)
                }
    }
}

struct Provider: TimelineProvider {
    // Helper to read data from the App Group
//    func getSharedData() -> (level: String, air: String) {
//        let shared = UserDefaults(suiteName: "group.me.grampoundigitaltwin")
//        let level = shared?.string(forKey: "river_level") ?? "Loading..."
//        let air = shared?.string(forKey: "air_quality") ?? "Loading..."
//        return (level, air)
//    }

    func getSharedData() -> (level: String, air: String) {
        let groupID = "group.me.grampounddigitaltwin"
        guard let sharedContainerURL = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: groupID) else {
            return ("Group Error", "Setup")
        }
        
        let fileURL = sharedContainerURL.appendingPathComponent("community_data.json")
        
        if let data = try? Data(contentsOf: fileURL),
           let json = try? JSONSerialization.jsonObject(with: data) as? [String: String] {
            return (json["riverLevel"] ?? "N/A", json["airQuality"] ?? "N/A")
        }
        
        return ("Waiting...", "Open App")
    }
    
    
    func placeholder(in context: Context) -> CommunityEntry {
        CommunityEntry(date: Date(), riverLevel: "1.2m", airQuality: "Good")
    }

    func getSnapshot(in context: Context, completion: @escaping (CommunityEntry) -> ()) {
        let data = getSharedData()
        let entry = CommunityEntry(date: Date(), riverLevel: data.level, airQuality: data.air)
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        let data = getSharedData()
        let entry = CommunityEntry(date: Date(), riverLevel: data.level, airQuality: data.air)
        let timeline = Timeline(entries: [entry], policy: .atEnd)
        completion(timeline)
    }
}

struct CommunityWidget: Widget {
    let kind: String = "CommunityDashboardWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            CommunityWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Local Environmental Monitor")
        .description("Keep an eye on local river levels and air quality.")
        .supportedFamilies([ .systemMedium, .systemSmall]) // You can choose sizes here
        .contentMarginsDisabled()
    }
}
